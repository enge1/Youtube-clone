import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))


    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
    console.log(videos)
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  

  return (
    <Grid container minHeight="95vh"  >
      <Grid item xs={12} md={8}>

        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls playing />
        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
          {title}
        </Typography>
        <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
          <Link to={`/channel/${channelId}`}>
            <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
              {channelTitle}
              <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
            </Typography>
          </Link>
          <Stack direction="row" gap="20px" alignItems="center">
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {parseInt(viewCount).toLocaleString()} views
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {parseInt(likeCount).toLocaleString()} likes
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>

        <Grid container>
          {
            videos.map((item, index) => {
              return (
                <>
                  <Grid item xs={6} style={{marginBottom:"10px"}}>
                    <Link to={`/video/${item.id.videoId}`} style={{ width: "100%" }}>
                      <CardMedia image={item.snippet?.thumbnails?.high?.url} alt={item.snippet?.title}
                        sx={{ width: "100%", height: "150px" ,borderRadius:"10px"}}
                      />
                    </Link>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{  height: '150px', width: "100%" }}>
                      <Link to={`/video/${item.id.videoId}`} >
                        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                          {item.snippet?.title.slice(0, 60)}
                        </Typography>
                      </Link>
                      <Link to={`/channel/${item.snippet?.channelId}`} >
                        <Typography variant="subtitle2" color="gray">
                          {item.snippet?.channelTitle}
                          <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                        </Typography>
                      </Link>
                    </Box>
                  </Grid>
                </>
              )
            })
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoDetail;
