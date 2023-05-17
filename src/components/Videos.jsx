import React from "react";
import { Stack, Box,Grid } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  if(!videos?.length) return <Loader />;
  
  return (
    <Grid container justifyContent="center" spacing={2} >
      {videos.map((item, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
          {item.id.videoId && <VideoCard video={item} /> }
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Grid>
      ))}
    </Grid>

 
  );
}

export default Videos;
