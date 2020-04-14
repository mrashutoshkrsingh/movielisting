import React, { useEffect, useState } from "react";
// import LazyLoad, { lazyload } from "react-lazyload";
import ReactImageAppear from "react-image-appear";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import axios from "axios";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
}));

const App = () => {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(1);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=a708a3fa64db6e6c5873d74cb5d71a8b&page=" +
          start
      )
      .then((res) => {
        setData((data) => {
          return [...data, ...res.data.results];
        });
      });
  }, [start]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://api.themoviedb.org/3/movie/top_rated?api_key=a708a3fa64db6e6c5873d74cb5d71a8b&page=" +
  //         start
  //     )
  //     .then((res) => {
  //       setData(res.data.results);
  //     });
  // }, []);

  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <InfiniteScroll
          dataLength={data.length}
          next={() => setStart(start + 1)}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          height={"100vh"}
        >
          {/* <LazyLoad> */}
          <div className={classes.root}>
            <GridList cellHeight={360} className={classes.gridList} cols={3}>
              {data.map((tile) => (
                <GridListTile key={tile.id} cols={tile.cols || 1}>
                  {/* <img
                  src={`https://image.tmdb.org/t/p/w500${tile.poster_path}`}
                  alt={tile.title}
                /> */}
                  <ReactImageAppear
                    src={`https://image.tmdb.org/t/p/w500${tile.poster_path}`}
                    animation="blurIn"
                    animationDuration="0.5s"
                    // loader="https://cache.dominos.com/nolo/ca/en/010048/assets/build/images/img/spinner.gif"
                    // loaderStyle={{ border: "2px solid red" }}
                    // showLoader={false}
                  />
                  <div className="overlay">
                    <div>{tile.overview.slice(0, 50) + "..."}</div>
                    <div>
                      <i className="fa fa-thumbs-o-up" />
                    </div>
                  </div>
                </GridListTile>
              ))}
            </GridList>
          </div>
          {/* </LazyLoad> */}
        </InfiniteScroll>
      </header>
    </div>
  );
};

export default App;
