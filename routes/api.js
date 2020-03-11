const router = require('express').Router()

const allocateAndReport = (requestList) => {
	
	// Initiate an empty butler list
	let butlerList = []
	
	// Sort the request so all the same clients are together
	requestList = requestList.sort((a, b) => a.clientId - b.clientId)
	
	// Iterating over the research
	requestList.forEach(req => {
		
		// For every Iteration the butler list is sorted with 
		// proper hours
		butlerList = butlerList.sort((a, b) => a.remHrs - b.remHrs)
		
		// Search for a butler with available hours and previous
		// history with the client
		const existingClientButler = butlerList.find(
			butler => butler.clientIds.includes(req.clientId) && butler.remHrs >= req.hours
		)
		
		// Search for a butler with the first availble butler with
		// passable hours
		const existingButler = butlerList.find(butler => butler.remHrs >= req.hours)
		
		// Conditioning based on the above searches
		if (existingClientButler) {
			
			// Mapping over the existing butler list
			// to create a new with the current client request
			butlerList = butlerList.map(butler => {
				if (butler.butlerId == existingClientButler.butlerId) {
					butler.clientIds.push(req.clientId)
					butler.requestIds.push(req.requestId)
					butler.remHrs = butler.remHrs - req.hours
				}
				return butler
			})
		} else if (existingButler) {
			butlerList = butlerList.map(
				butler => {
					if (butler.butlerId == existingButler.butlerId) {
						butler.clientIds.push(req.clientId)
						butler.requestIds.push(req.requestId)
						butler.remHrs = butler.remHrs - req.hours
					}
					return butler
				})
		} else {
			butlerList.push({
				butlerId: butlerList.length,
				remHrs: 8-req.hours,
				clientIds: [req.clientId],
				requestIds: [req.requestId]
			})
		}
	})
	console.log(butlerList)
}

const exampleRequests = [
	    {
		    clientId: 1,
		    requestId: 'abc',
		    hours: 6
	    },
	    {
	            clientId: 2,
	            requestId: 'ghi',
	            hours: 1
	    },
	    {
	            clientId: 1,
	            requestId: 'def',
	            hours: 4
	    },
	    {
	            clientId: 1,
	            requestId: 'zzz',
	            hours: 2
	    }
]

allocateAndReport(exampleRequests)

module.exports = router
