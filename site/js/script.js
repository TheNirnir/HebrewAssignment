var PublicationsTitleHtml = "snippets/Publications-title-snippet.html";
var PublicationsFirstRowHtml = "snippets/Publication-first-row-snippet.html";
var PublicationsOptionalRowHtml = "snippets/Publication-optional-row-snippet.html"
var supervisionTitleHtml = "snippets/Supervision-title-snippet.html";
var supervisionHtml = "snippets/Supervision-snippet.html";
var NewsTitleHtml = "snippets/News-title-snippet.html";
var NewsHtml = "snippets/News-snippet.html";
var HomeFirstHtml = "snippets/Home-first-snippet.html";
var HomeNewsHtml = "snippets/News-list-snippet.html";
var HomeSecondHtml = "snippets/Home-second-snippet.html";
var HomePressActivitiesHtml = "snippets/Press-activities-snippet.html";
var HomeThirdHtml = "snippets/Home-third-snippet.html";
var HomeEndingHtml = "snippets/Home-ending-snippet.html";

var newsInterval;
var i = 0;

document.addEventListener("DOMContentLoaded", function (event) {
	pageTransformation('Home');
});

function pageTransformation (pageName) {
	clearInterval(newsInterval);
	document.querySelector(".page-on").className = "";
	document.querySelector("#" + pageName + "-option").className = "page-on";
	if (pageName == "Home") {
		i = 0;
		buildAndShowHome(HomeObj, newsArray);
	}

	if (pageName == "CV") {
		$ajaxUtils.sendGetRequest("snippets/" + pageName + "-snippet.html", function (responseText) {
			document.querySelector("#main-content").innerHTML = responseText;
		},
		false);
	}

	if (pageName == "Publications") {
	    buildAndShowPublication(publicationsArray);
	}

	if (pageName == "Supervision") {
		buildAndShowSupervision(supervisionArray, internsArray);
	}

	if (pageName == "News") {
		buildAndShowNews(newsArray);
	}
}

function newsOrderFunction (i) {
	var newsOrderArray = [];
	for (var j=0; j<4;) {
		if (i < 6) {
			newsOrderArray[j] = i;
		}
		else {
			newsOrderArray[j] = i - 6;
			if (newsOrderArray[j] > 5) {
				newsOrderArray[j] = newsOrderArray[j] - 6;
			}
			if (newsOrderArray[j] > 5) {
				newsOrderArray[j] = newsOrderArray[j] - 6;
			}
		}
		i++;
		j++;
	}
	return newsOrderArray;
}

function NewsInterval (newsArray) {
	buildAndShowHomeNews(newsArray);
	newsInterval = setInterval(function () {
		buildAndShowHomeNews(newsArray);
		i++;
		if (i == newsArray.length) {
			i = 0;
		}
	}, 3000)
}

function insertProperty (string, propName, propValue) {
	var propToReplace = "{{" + propName + "}}";
	string = string.replace(RegExp(propToReplace, "g"), propValue);
	return string;
}

function buildAndShowHomeNews (newsArray) {
		var newsOrder = newsOrderFunction(i);
		$ajaxUtils.sendGetRequest(HomeNewsHtml, function(HomeNewsHtml) {
			var NewsViewHTML = buildHomeNewsViewHTML(newsArray, HomeNewsHtml, newsOrder);
			document.querySelector("#home-news-list").innerHTML = NewsViewHTML;
		}, false);
}

function buildHomeNewsViewHTML(newsArray, HomeNewsHtml, newsOrder) {
	var finalHtml = "";

	for (var k in newsOrder) {

		var html = HomeNewsHtml;
		var number = newsOrder[k]+1;
		var date = newsArray[newsOrder[k]].date;
		var startContent = newsArray[newsOrder[k]].startContent;
		var linkTo = newsArray[newsOrder[k]].linkTo;
		var linkName = newsArray[newsOrder[k]].linkName;
		var continueContent = newsArray[newsOrder[k]].continueContent;

		html = insertProperty(html, "number", number);
		html = insertProperty(html, "date", date);
		html = insertProperty(html, "startContent", startContent);
		html = insertProperty(html, "linkTo", linkTo);
		html = insertProperty(html, "linkName", linkName);
		html = insertProperty(html, "continueContent", continueContent);
		finalHtml += html;

	}

	return finalHtml;
}

function buildAndShowPublication (publicationsArray) {
		$ajaxUtils.sendGetRequest(PublicationsTitleHtml, function(PublicationsTitleHtml) {
			$ajaxUtils.sendGetRequest(PublicationsFirstRowHtml, function(PublicationsFirstRowHtml) {
				$ajaxUtils.sendGetRequest(PublicationsOptionalRowHtml, function(PublicationsOptionalRowHtml) {
					var PublicationsViewHTML = buildPublicationsViewHTML(publicationsArray, PublicationsTitleHtml, PublicationsFirstRowHtml, PublicationsOptionalRowHtml);
					document.querySelector("#main-content").innerHTML = PublicationsViewHTML;
				}, false);
			}, false);
		}, false);
}

function buildPublicationsViewHTML(publicationsArray, PublicationsTitleHtml, PublicationsFirstRowHtml, PublicationsOptionalRowHtml) {
	var finalHtml = PublicationsTitleHtml;
	var smallHeaderRow = publicationsArray.length - 3;

	for (var j = 0; j<publicationsArray.length;) {
		var html = "";

		if (j == smallHeaderRow) {
			html += "<hr><h3 id='publication-h3'>In Aerospace Sciences</h3>";
		}
		var morePaddingPublication = publicationsArray.length - j;
		if (morePaddingPublication == 27 || morePaddingPublication == 18) {
			html += "<li class='more-padding-publication'>";
		}
		else {
			html += "<li>";
		}
		html += PublicationsFirstRowHtml;

		var namesBeforeRami = publicationsArray[j].namesBeforeRami;
		var RamiBenAri = publicationsArray[j].RamiBenAri;
		var namesAfterRami = publicationsArray[j].namesAfterRami;
		var title = publicationsArray[j].title;
		var linkTo = publicationsArray[j].linkTo;
		var linkName = publicationsArray[j].linkName;
		var achievement = publicationsArray[j].achievement;

		html = insertProperty(html, "namesBeforeRami", namesBeforeRami);
		html = insertProperty(html, "RamiBenAri", RamiBenAri);
		html = insertProperty(html, "namesAfterRami", namesAfterRami);
		html = insertProperty(html, "title", title);
		html = insertProperty(html, "linkTo", linkTo);
		html = insertProperty(html, "linkName", linkName);
		html = insertProperty(html, "achievement", achievement);

		if (publicationsArray[j].link2To) {
			var link2To = publicationsArray[j].link2To;
			var link2Name = publicationsArray[j].link2Name;

			html = insertProperty(html, "link2To", link2To);
			html = insertProperty(html, "link2Name", link2Name);
		}
		if (publicationsArray[j].link3To) {
			var link3To = publicationsArray[j].link3To;
			var link3Name = publicationsArray[j].link3Name;

			html = insertProperty(html, "link3To", link3To);
			html = insertProperty(html, "link3Name", link3Name);
		}
		if (publicationsArray[j].link4To) {
			var link4To = publicationsArray[j].link4To;
			var link4Name = publicationsArray[j].link4Name;

			html = insertProperty(html, "link5To", link4To);
			html = insertProperty(html, "link5Name", link4Name);
		}
		if (publicationsArray[j].link5To) {
			var link5To = publicationsArray[j].link5To;
			var link5Name = publicationsArray[j].link5Name;

			html = insertProperty(html, "link5To", link5To);
			html = insertProperty(html, "link5Name", link5Name);
		}

		html = insertProperty(html, "link2To", "");
		html = insertProperty(html, "link2Name", "");
		html = insertProperty(html, "link3To", "");
		html = insertProperty(html, "link3Name", "");
		html = insertProperty(html, "link4To", "");
		html = insertProperty(html, "link4Name", "");
		html = insertProperty(html, "link5To", "");
		html = insertProperty(html, "link5Name", "");

		if (publicationsArray[j].imageSource !== "") {
			html += PublicationsOptionalRowHtml;

			var imageSource = "images/Publications-img/";
			imageSource += publicationsArray[j].imageSource;
			var abstractContent = publicationsArray[j].abstractContent;

			html = insertProperty(html, "imageSource", imageSource);
			html = insertProperty(html, "abstractContent", abstractContent);
		}
		html += "</li>";
		finalHtml += html;

		j++;
	}
	finalHtml += "</ul>";
	return finalHtml;
}

function buildAndShowSupervision (supervisionArray, internsArray) {
		$ajaxUtils.sendGetRequest(supervisionTitleHtml, function(supervisionTitleHtml) {
			$ajaxUtils.sendGetRequest(supervisionHtml, function(supervisionHtml) {
				var SupervisionViewHTML = buildSupervisionViewHTML(supervisionTitleHtml, supervisionHtml, supervisionArray, internsArray);
				document.querySelector("#main-content").innerHTML = SupervisionViewHTML;
			}, false);
		}, false);
}

function buildSupervisionViewHTML(supervisionTitleHtml, supervisionHtml, supervisionArray, internsArray) {
	var finalHtml = supervisionTitleHtml;

	for (var j = 0; j<supervisionArray.length;) {
		var html = supervisionHtml;

		var name = supervisionArray[j].name;
		var content = supervisionArray[j].content;

		html = insertProperty(html, "name", name);
		html = insertProperty(html, "content", content);

		finalHtml += html;

		j++;
	}

	finalHtml += "<h3 id='interns-h3'>Interns</h3>";

	for (var j = 0; j<internsArray.length;) {
		var html = supervisionHtml;

		var name = internsArray[j].name;
		var content = internsArray[j].content;

		html = insertProperty(html, "name", name);
		html = insertProperty(html, "content", content);

		finalHtml += html;

		j++;
	}
	finalHtml += "</ul></div>";
	return finalHtml;
}

function buildAndShowNews (newsArray) {
		$ajaxUtils.sendGetRequest(NewsTitleHtml, function(NewsTitleHtml) {
			$ajaxUtils.sendGetRequest(NewsHtml, function(NewsHtml) {
				var NewsViewHTML = buildNewsViewHTML(NewsTitleHtml, NewsHtml, newsArray);
				document.querySelector("#main-content").innerHTML = NewsViewHTML;
			}, false);
		}, false);
}

function buildNewsViewHTML(NewsTitleHtml, NewsHtml, newsArray) {
	var finalHtml = NewsTitleHtml;

	for (var j = 0; j<newsArray.length;) {
		var html = NewsHtml;

		var date = newsArray[j].date;
		var startContent = newsArray[j].startContent;
		var linkTo = newsArray[j].linkTo;
		var linkName = newsArray[j].linkName;
		var continueContent = newsArray[j].continueContent;

		html = insertProperty(html, "date", date);
		html = insertProperty(html, "startContent", startContent);
		html = insertProperty(html, "linkTo", linkTo);
		html = insertProperty(html, "linkName", linkName);
		html = insertProperty(html, "continueContent", continueContent);
		finalHtml += html;

		j++;
	}

	finalHtml += "</ul></div>";
	return finalHtml;
}
// 
function buildAndShowHome (HomeObj, newsArray) {
		$ajaxUtils.sendGetRequest(HomeFirstHtml, function(HomeFirstHtml) {
			$ajaxUtils.sendGetRequest(HomeNewsHtml, function(HomeNewsHtml) {
				$ajaxUtils.sendGetRequest(HomeSecondHtml, function(HomeSecondHtml) {
					$ajaxUtils.sendGetRequest(HomePressActivitiesHtml, function(HomePressActivitiesHtml) {
						$ajaxUtils.sendGetRequest(HomeThirdHtml, function(HomeThirdHtml) {
							$ajaxUtils.sendGetRequest(HomeEndingHtml, function(HomeEndingHtml) {
								var HomeViewHTML = buildHomeViewHTML(HomeObj, newsArray, HomeFirstHtml, HomeNewsHtml, HomeSecondHtml, HomePressActivitiesHtml, HomeThirdHtml, HomeEndingHtml);
								document.querySelector("#main-content").innerHTML = HomeViewHTML;
							}, false);
						}, false);
					}, false);
				}, false);
			}, false);
		}, false);
}

function buildHomeViewHTML(HomeObj, newsArray, HomeFirstHtml, HomeNewsHtml, HomeSecondHtml, HomePressActivitiesHtml, HomeThirdHtml, HomeEndingHtml) {
	var finalHtml = HomeFirstHtml;

	var aboveImageContent = HomeObj.aboveImageContent;
	var imageSource = HomeObj.imageSource;
	var about = HomeObj.about;
	var linksStartContent = HomeObj.linksStartContent;

	var link1To = HomeObj.link1To;
	var link1Name = HomeObj.link1Name;
	var links1Content = HomeObj.links1Content;

	var link2To = HomeObj.link2To;
	var link2Name = HomeObj.link2Name;
	var links2Content = HomeObj.links2Content;

	var link3To = HomeObj.link3To;
	var link3Name = HomeObj.link3Name;
	var links3Content = HomeObj.links3Content;

	var link4To = HomeObj.link4To;
	var link4Name = HomeObj.link4Name;
	var links4Content = HomeObj.links4Content;

	var link5To = HomeObj.link5To;
	var link5Name = HomeObj.link5Name;

	var contactStartContent = HomeObj.contactStartContent;
	var firstContact = HomeObj.firstContact;
	var secondContact = HomeObj.secondContact;
	var thirdContact = HomeObj.thirdContact;
	var fourthContact = HomeObj.fourthContact;
	var fifthContact = HomeObj.fifthContact;

	finalHtml = insertProperty(finalHtml, "aboveImageContent", aboveImageContent);
	finalHtml = insertProperty(finalHtml, "imageSource", imageSource);
	finalHtml = insertProperty(finalHtml, "about", about);
	finalHtml = insertProperty(finalHtml, "linksStartContent", linksStartContent);

	finalHtml = insertProperty(finalHtml, "lin1To", link1To);
	finalHtml = insertProperty(finalHtml, "link1Name", link1Name);
	finalHtml = insertProperty(finalHtml, "links1Content", links1Content);

	finalHtml = insertProperty(finalHtml, "link2To", link2To);
	finalHtml = insertProperty(finalHtml, "link2Name", link2Name);
	finalHtml = insertProperty(finalHtml, "links2Content", links2Content);

	finalHtml = insertProperty(finalHtml, "link3To", link3To);
	finalHtml = insertProperty(finalHtml, "link3Name", link3Name);
	finalHtml = insertProperty(finalHtml, "links3Content", links3Content);

	finalHtml = insertProperty(finalHtml, "link4To", link4To);
	finalHtml = insertProperty(finalHtml, "link4Name", link4Name);
	finalHtml = insertProperty(finalHtml, "links4Content", links4Content);

	finalHtml = insertProperty(finalHtml, "link5To", link5To);
	finalHtml = insertProperty(finalHtml, "link5Name", link5Name);

	finalHtml = insertProperty(finalHtml, "contactStartContent", contactStartContent);
	finalHtml = insertProperty(finalHtml, "firstContact", firstContact);
	finalHtml = insertProperty(finalHtml, "secondContact", secondContact);
	finalHtml = insertProperty(finalHtml, "thirdContact", thirdContact);
	finalHtml = insertProperty(finalHtml, "fourthContact", fourthContact);
	finalHtml = insertProperty(finalHtml, "fifthContact", fifthContact);

	var newsOrder = newsOrderFunction(i);
	var NewsViewHTML = buildHomeNewsViewHTML(newsArray, HomeNewsHtml, newsOrder);
	finalHtml += NewsViewHTML;

	finalHtml += HomeSecondHtml;

	for (var j = 0; j<HomeObj.pressActivities.length;) {
		var html = HomePressActivitiesHtml;

		var linkTo = HomeObj.pressActivities[j].linkTo;
		var linkName = HomeObj.pressActivities[j].linkName;

		html = insertProperty(html, "linkTo", linkTo);
		html = insertProperty(html, "linkName", linkName);

		finalHtml += html;

		j++;
	}

	finalHtml += HomeThirdHtml;

	for (var j = 0; j<HomeObj.ResearchInterests.length;) {
		var html = "<li>";

		if (typeof HomeObj.ResearchInterests[j] === "object") {
			html += HomeObj.ResearchInterests[j].title;
			html += "<ul>";

			for (var l = 0; l < HomeObj.ResearchInterests[j].list.length;) {
				html += "<li>";
				html += HomeObj.ResearchInterests[j].list[l];
				html += "</li>";

				l++;
			}

			html += "</ul>";
		}
		else {
			html += HomeObj.ResearchInterests[j];
		}

		html += "</li>";

		finalHtml += html;

		j++;
	}

	finalHtml += HomeEndingHtml;
	NewsInterval(newsArray);
	return finalHtml;
}