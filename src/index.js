import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'
let client;

const initialize = () => {
  client = Stitch.initializeDefaultAppClient('remhek-zuloy');
}


const createCallToAction = (org, text) => {
  const urlMatches = text.match("(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?");
  let url = '';
  if (urlMatches && urlMatches.length > 0){
    url += urlMatches[0];
  }
  const template = `<div class="coa">
    <div class="coa-logo">
      <div class="coa-logo-container">
        <!--<img src="">-->
      </div>
    </div>
    <div class="coa-content">
      <h3>${org}</h3>
      <p>${text}</p>
      <a href="${url}">${url}</a>
    </div>
  </div>`;
  return template;
}

const clearCategories = () => {
  $('.coa').remove();
}

const submitQuery = () => {
  clearCategories();
  client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
    client.callFunction("searchEvent", [$('#search-bar').text()]).then(result => {
      console.log(result);
      if (result) {
        const tweets = result.tweets;
        console.log(tweets.length);
        for (let cnt = 0; cnt < tweets.length; cnt++) {
          const userName = tweets[cnt].user_name;
          const text = tweets[cnt].text;
          let category = tweets[cnt].category;
          if (category != 'volunteer' && category != 'donations') {
            category = 'other';
          }
          const callToActionCard = createCallToAction(userName, text);
          console.log(callToActionCard);
          $('#' + category).append(callToActionCard);
        }
      }
    });
  });
}

const makeSectionTitlesAppear = () => {
  $('.coa-group-title').css('opacity', '0.54');
}

$('#search-bar').keypress(function (e) {
  var key = e.which;
  if (key == 13) {
    e.preventDefault();
    $('#search-button').click();
  }
 });

$('#search-button').click(function() {
  animateSearch();
  submitQuery();
  makeSectionTitlesAppear();
});

function animateSearch(){
	const searchContainer = document.getElementsByClassName("search-container")[0];
	searchContainer.classList.add("squashed-search");
}

initialize();