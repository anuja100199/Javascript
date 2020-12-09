const url = "https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json";
async function loadData() {							// Fetch the data
		 return fetch(url)
		 	.then(response => response.text());
		}
let data = loadData();								// Get the response in data variable
let count = 0
data.then(text => {
			json = JSON.parse(text);
			for (let i=0; i<json.length; i++){		// Fetching each record and comparing the total value with actual sum of flights
				let record = json[i]['Statistics']['Flights'];
				let sum = record['Cancelled'] + record['Delayed'] + record['Diverted'] + record['On Time'];
				if (sum == record['Total'])			// If the value is correct increase the count
					count = count + 1;
			}
			console.log(count+' RECORDS ARE CORRECT'); // Display the number of correct records
		});
data.catch(err => alert(err));						// Error handling