
  $.get("https://www.breakingbadapi.com/api/characters", function (actors) {

    for (let actor of actors) {

      let $newItem = $("<div id='newItem'></div>").appendTo('#sectionActeur');
      $('<img/>', {
        src: actor.img,
        id: 'newImg'
      }).appendTo($newItem);
      $("<p id='newName'></p>").html(actor.name).appendTo($newItem);
      $("<p id='newNickname'</p>").html(actor.nickname).appendTo($newItem);

      $newItem.id = actor;

      $("#searchPerso").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $($newItem).filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

      $($newItem).on('click', function () {
        $("#sectionAffichagePerso").show().empty();
        $("#sectionActeur").hide();
        $("<div></div>").html( '<img src= ' + actor.img + '/>'+'<p>' + actor.name 
        + '</p>' + '<p>' + actor.nickname + '</p>' + '<p>' + actor.occupation + '</p>' + '<p>' + '<p>' + actor.birthday + '</p>').appendTo("#sectionAffichagePerso");
        })
    }
  })

  $.get("https://www.breakingbadapi.com/api/episodes", function (episodes) {


    for (let episode of episodes) {

      let $episodeList = $("<div id='episodeList'></div>").appendTo('#sectionEpisode');
      $("<div id ='episodeElement'></div>").html('<h2>' + episode.title + '</h2>' + '<p>' + 'Episode:' + episode.episode + '</p>' + '<p>' +'Saison:' + episode.season + '</p>').appendTo($episodeList);
      $("<div id='episodeCharacters'></div>").html('<h3>Personnages:</h3>' + '<p>' + episode.characters + '</p>').appendTo($episodeList);

      $("#searchEpisode").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $($episodeList).filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    }
  })

  $.get("https://www.breakingbadapi.com/api/quotes", function (quotes) {

    for (let quote of quotes) {
      $("<div id='quoteElement'></div>").html('<blockquote>' + quote.quote + '</blockquote>' +'<cite>' + quote.series + '</cite>').appendTo('#quoteList');
      let $newOption = $("<option class='optionAuthor'></option>").html(quote.author).appendTo('#select');

      $($newOption).on('click', function () {
      $("#quoteList").hide();
      $("<div></div>").html('<blockquote>'+ quote.quote +'</blockquote>').addClass("red").appendTo("#sectionCitation");
      })
    }
  })

  $.get("https://www.breakingbadapi.com/api/quote/random", function (dayquotes) {

    for (let dayquote of dayquotes) {

      $("<div id='dayQuoteElement'></div>").html('<blockquote>' + dayquote.quote + '</blockquote>').addClass('dayquote').appendTo('#dayQuote');
      $("<div id='dayQuoteSeries'></div>").html('<cite>' + dayquote.series + '</cite>').appendTo('#dayQuote');
    }
  })

  /**boutons navigation */

  $("#btnEpisode").on('click', function () {
    $("#sectionActeur").hide();
    $('#sectionAffichagePerso').hide();
    $('#sectionCitation').hide();
    $('#sectionEpisode').show();
  });
  $("#btnPerso").on('click', function () {
    $("#sectionActeur").show();
    $('#sectionAffichagePerso').hide();
    $('#sectionCitation').hide();
    $('#sectionEpisode').hide();
  });
  $("#btnCitation").on('click', function () {
    $("#sectionActeur").hide();
    $('#sectionAffichagePerso').hide();
    $('#sectionCitation').show();
    $('#sectionEpisode').hide();
  });
;