const cardDark = (id, hours, clientId) => `
	<div class="card text-white bg-dark mb-3" >
	  <div class="card-header">Request</div>
	  <div class="card-body">
	  	<h5 class="card-title">${id}</h5>
		<p class="card-text">Requesting ${hours} hour(s) of work for clientId - ${clientId}</p>
	  </div>
	</div>
`

const cardWithPic = (butler) => `
	<div class="card mb-3 mr-3 col-md-4">
  		<div class="row no-gutters">
	    		<div class="col-md-4">
	      			<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F9e%2Fb9%2F27%2F9eb9273bd4fdc9acc71fa21ab0417619.jpg&f=1&nofb=1" class="card-img" alt="butler-image">
	    		</div>
	    		<div class="col-md-8">
	      			<div class="card-body">
	        			<h5 class="card-title">Butler - ${butler.butlerId+1}</h5>
	        			<p class="card-text">
						<div class="card">
							<ul class="list-group list-group-flush">
							${
								butler.requestIds.map(request => `
									<li class="list-group-item">${request}</li>
								`).join('')
							}
							</ul>
						</div>
					</p>

	        			<p class="card-text">
						<small class="text-muted">
							Hours Left - ${butler.remHrs}
						</small>
					</p>
	      		</div>
		</div>
	</div>
</div>
`

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

const render = (exampleRequests) => {

	let html = ""
	exampleRequests.forEach(request => {
		html += cardDark(request.requestId, request.hours, request.clientId)
	})

	document.querySelector('#request-container').innerHTML = html

	axios({
   		method: 'POST',
   		url: '/api/requestButler',
   	data: exampleRequests
 	})
   	.then( ({ data }) => {
		let html = data.map(d => cardWithPic(d)).join('')
		document.querySelector('#butler-container').innerHTML = html
   	})
}

render(exampleRequests)

document.querySelector('.new-request').addEventListener('click', function (e) {
	let newReq = JSON.parse(document.querySelector('textarea').value)
	render(newReq)
	$('#exampleModal').modal('hide')
})
