function animateSearch(){
	// alert("hi")
	var searchContainer = document.getElementById("searchContainer");
	searchContainer.classList.remove("expanded_container");
	searchContainer.classList.add("squashed_container");

	var searchBox = document.getElementById("searchBox");
	searchBox.classList.remove("expanded_box");
	searchBox.classList.add("squashed_box");
}