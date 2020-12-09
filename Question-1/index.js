        	// Counts the maximum occurences for indexName in arr
        	function countMax(arr, indexName){
        		let counter = 0;
        		let tempVar = 1;
        		let item;

        		for (let i=0; i<arr.length; i++){
        			for (let j=i; j<arr.length; j++){
        				if (arr[i][indexName] == arr[j][indexName])
        					counter++;
        					if (tempVar < counter){
        						tempVar = counter;
        						item = arr[i][indexName];
        					}
        			}
        			counter = 0;
        		}
        		return item;
        	}
        	// Counts the number of battles won
        	function countWin(arr){
        		let win = 0;
        		for (let i=0; i<arr.length; i++){
        				if (arr[i]['attackerOutcome'] == 'win')
        					win++;		
        	}
        	return win;
        }
	        // Counts the number of battles lost
	        function countLoss(arr){
	        		let loss = 0;
	        		
	        		for (let i=0; i<arr.length; i++){
	        				if (arr[i]['attackerOutcome'] == 'loss')
	        					loss++;		
	        	}
	        	return loss;
	        }

	        // Main code
	           fetch('battles.json')
			   	.then((response) =>  response.json())
			   		.then((json) => {
			    
					let list = ['attackerKing','defenderKing','region','name'];
					let mostActive = [];

					// Calling the function countMax for letious indexNames in list
					for (let i in list){
						mostActive.push(countMax(json,list[i]));   
					}

					let battleType = [];
					let defenderSize = [];

					//	Storing the battleType and defenderSize values
					for (let i=0; i<json.length; i++){
						battleType.push(json[i]['battleType']);		
						defenderSize.push(json[i]['defenderSize']);
					}

					// Finding the battle types. Storing the first occurrences of each value.
					  let unique = battle_type.filter(function(item,pos){
				    	if (battle_type.indexOf(item) == pos){
				    		return item;
				    	}
					});

					let sum = 0;
					let max = 0;
					let min = 400000;

					// Finding maximum, minimum and average value of defenderSize array
					for(let i=0; i<json.length; i++){		
						if (defenderSize[i] != null){
							if (defenderSize[i] > max){
								max = defenderSize[i];
							}
							if (defenderSize[i] < min){
								min = defenderSize[i];
							}
							sum = sum + defenderSize[i];
						}
					}
					let avg = sum / defenderSize.length;
				
					// Constructing the JSON object
					let answer = {							
						'mostActive':{
							'attackerKing' : mostActive[0],
							'defenderKing': mostActive[1],
							'region': mostActive[2],
							'name': mostActive[3]
						},
						'attackerOutcome':{
							'win': countWin(json), 	
							'loss': countLoss(json) 
						},
						'battleType': unique, 
						'defenderSize':{
							'average': avg,
							'min': min,
							'max' : max
							}
						}
						console.log(answer);
					});


