console.log("This is my index js file");
//API key -->de587ea8c2734ff380fb2564a78ac4d0
//get Request-->https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=de587ea8c2734ff380fb2564a78ac4d0

//access it using http://localhost:5500/index.html

//Initialize the news api parameters
const source = 'the-times-of-india';
const apiKey = config.SECRET_API_KEY;
//grab the news container
let newsAccordion = document.getElementById('newsAccordion');

//Create an AJAX Get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        
        articles.forEach((element,index)=>{
            // console.log(articles[news]);

            let news = `<div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button btn btn-primary collapsed " type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapse${index}" aria-controls="collapse${index}">
                                    <b style = "color:black" ><span class="badge bg-secondary">Breaking News${index+1}:</span>${element["title"]}</b>
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                                data-bs-parent="#newsAccordion">
                                <div class="accordion-body">
                                    <p>${element["content"]}.<a href="${element['url']}" target = "_blank">Read more here</a></p>
                                </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    } else {
        console.log("Some error occured");
    }
}

xhr.send();

