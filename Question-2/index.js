			var user = prompt('Enter the search query');

			// Fetching data according to search query
			function getData(){
				return fetch('https://api.github.com/search/repositories?q='+user)
				.then(response => response.json());
			}


			let ownerDetails =[];
			let branchUrl = [];
			let allObjs = [];

			// Fetching data and processing
			let data = getData();
			data.then((json) => {
				for(let i=0; i<json.items.length; i++){			//For each record fulfilling search query store the values
					let record = json.items[i]; 

					if (record['license']!= null)
						var licenseName = record['license']['name'];
					else
						licenseName = null;
					ownerDetails.push(record['owner']);
					branchUrl.push(record['branches_url'])

					let jsonObj = {								// Form the JSON object
						"name": record['name'],
						"fullName": record['full_name'],
						"private": false,
						"licenseName": licenseName,
						"score": record['score'],
						"owner":{},
						"numberOfBranch": null
					};
					allObjs.push(jsonObj);						// For all the records, store the JSON object and pass to next promise
				}
				return [ownerDetails,branchUrl,allObjs];
			})
			
			.then((apiCalls) => {								// Fetching owner info from owner url
				let ownerInfo = apiCalls[0];
				let branch = apiCalls[1];
				let urls = [];				
				for (let i=0; i<ownerInfo.length; i++)			// Form the urls array
					urls.push(ownerInfo[i]['url']);
				
					for (let i=0; i<urls.length; i++){			// Fetch data from each url and store it in JSON obj
						fetch(urls[i])
						.then((response) => response.json()
							.then((data) => {
								let ownerObj = {
									"login" : data['login'],
									"name": data['name'],
									"followersCount": data['followers'],
									"followingCount": data['following']
								};
								apiCalls[2][i].owner = ownerObj;	// Combine the JSON obj with previous data for each record
							})
						)
					}
				return [branch,apiCalls[2]];
			})
			
			.then((branches) => {									    // Fetching the branches data
				let actualUrl = [];
				for(let i=0; i<branches[0].length; i++){
					let temp = branches[0][i].replace("{/branch}","");	// CLeaning the url
					actualUrl.push(temp);
				}
				    for (let i=0; i<actualUrl.length; i++){				// For each url fetch data and count the number of records
				    	fetch(actualUrl[i])
				    		.then((response) => response.json()
				    			.then((data) => {
				    				branches[1][i].numberOfBranch = data.length;	// Append the count value in JSON object
				    			}));
				    }
				  console.log(branches[1]);								// Required output
				});
			data.catch(err => alert(err));