const url = "https://api.nobelprize.org/v1/prize.json";
async function loadData() {								// Fetch the url
		 return fetch(url)
		 	.then(response => response.json());
		}
		let data = loadData();							// Get the data
		data.then(json => {
			let prizes = json['prizes'];
			let answer = [];

			//Check the required conditions for each record
			for (let i=0 ; i<prizes.length; i++){	
				if (parseInt(prizes[i]['year'])>= 2000 && parseInt(prizes[i]['year'])<= 2019){		
					if(prizes[i]['category']=="chemistry")
						answer.push((prizes[i]));		// Storing the records in answer array
				}
			}
			console.log(answer)
});
		data.catch(err => alert('Invalid URL'));		// Error handling