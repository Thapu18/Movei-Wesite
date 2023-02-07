const APIURL = "Https://Api.Themoviedb.Org/3/Discover/Movie?Sort_by=Popularity.Desc&Api_key=04c35731a5ee918f014970082a0088b1&Page=1";

Const IMGPATH = "Https://Image.Tmdb.Org/T/P/W1280";

Const SEARCHAPI = "Https://Api.Themoviedb.Org/3/Search/Movie?&Api_key=04c35731a5ee918f014970082a0088b1&Query=";

// Ye HTML WALE TAG
Const Main = Document.GetElementById("Main");
Const Form = Document.GetElementById("Form");
Const Search = Document.GetElementById("Search");

///Initalyy Get Fav Movies
GetMovies(APIURL);

Async Function GetMovies(Url) {
  Const Resp = Await Fetch(Url);
  Const RespData = Await Resp.Json();

  // Movie Aa Gyi
  Console.Log(RespData);
  // Yaha Pe Show Karenge
  ShowMovies(RespData.Results);

}

Function ShowMovies(Movies) {
  //Clear Main
  Main.InnerHTML = "";
  Movies.ForEach((Movie) => {
    Const { Poster_path, Title, Vote_average, Overview } = Movie;
    // Raja
    Const MovieEl = Document.CreateElement("Div");
    MovieEl.ClassList.Add("Movie");


    MovieEl.InnerHTML = `
       <Img Src="${IMGPATH + Poster_path}" Alt="${Title}"/>

     <Div Class="Movie-Info">
         <H3>${Title}</H3>
         <Span Class="${GetClassByRate(Vote_average)}">${Vote_average}</Span>
     </Div> 

     <Div Class="Overview">

     <H2>Overview:</H2>
     ${Overview}
     </Div>
     `;

    Main.AppendChild(MovieEl)
  });

}


Function GetClassByRate(Vote) {
  If (Vote >= 8) {
    Return 'Green';
  } Else If (Vote >= 5) {
    Return 'Orange'
  } Else {
    Return 'Red';
  }

}


Form.AddEventListener("Submit", (E) => {
  E.PreventDefault();


  Const SearchTerm = Search.Value;

  If (SearchTerm) {

    GetMovies(SEARCHAPI + SearchTerm);

    Search.Value = "";
  }
});