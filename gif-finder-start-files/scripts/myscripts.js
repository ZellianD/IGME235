    // 1
    window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
	// 2
	let displayTerm = "";
	
	// 3
	function searchButtonClicked(){
		console.log("searchButtonClicked() called");
		
        const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";
        
        let GIPHY_KEY ="TR0AFX7HhuwGEpovTeUwdgkixPCdK6AI";

        let term = document.querySelector("#searchterm").value;
        displayTerm = term;

        term = term.trim();

        term = encodeURIComponent(term);

        if(term.length < 1) return;

        let limit = document.querySelector("#limit").value;

        let url = `${GIPHY_URL}api_key=${GIPHY_KEY}&q=${term}&limit=${limit}`;
        
        document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</br>";

        console.log(url);

        getData(url);
	}
	
    function getData(url){
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if(!data.data || data.data.length == 0){
                document.querySelector("#status").innerHTML = `<b>No results found for '${displayTerm}'</b>`;
                return;
            }
            let bigString = "";
            let gifs = data.data;
            for(let i =0; i<gifs.length; i++){

                let result = gifs[i];
                let smallURL = result.images.fixed_width_downsampled.url;

                if(!smallURL) smallURL = "images/no-image-found.png";

                let url = result.url;
                let rating = (result.rating ? result.rating : "NA").toUpperCase();
                let line = `<div class='result'><img src='${smallURL}' title = '${result.id}'/>`;
                    line += `<span><a target = '_blank' href='${url}'>View on Giphy</a><p>Rating: ${rating}</p></span></div>`;
                
                bigString += line;
            }
            document.querySelector("#content").innerHTML = bigString;
            document.querySelector("#status").innerHTML = `<b>Success!</b><p><i>Here are ${gifs.length} results for '${displayTerm}'</i></p>`;
        })
        .catch((error) => console.log("An error occured."))
    }
    