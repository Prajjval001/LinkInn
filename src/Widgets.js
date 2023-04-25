import React, { useState , useEffect } from 'react';
import './Widgets.css';
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {blueGrey } from '@mui/material/colors';

function Widgets() {



    const [news , setNews] = useState([]); // news + clickscount = news[i] 
    
    const newsArticle = (heading, url) => (
        <div className='widgets__article'>
           <div className="widgets__articleleft">
            <FiberManualRecordIcon />
            </div> 

           <div className="widgets__articleright">
           <h5> <a href = {url} style={{textDecoration:`none` ,color:`black`}} > {heading} </a> </h5>
            <p></p>
           </div> 

        </div>
    )

    
    useEffect(()=>{

        console.log('Fetching news...')
        fetch(`https://newsapi.org/v2/everything?q=jobs&pageSize=6&page=1&apiKey=0a7e28fae8744922b671a61e11b4cd41`).then((res) => res.json()).then((data) => {
        const fetchednews = [];
        console.log(data);
         for(let i = 0;i<6;i++){
          fetchednews[i] = newsArticle(data.articles[i].title , data.articles[i].url)
         }
         console.log(fetchednews);
         setNews(fetchednews);
        }).catch((err) => {console.log(err)});

    },[])

  return (
    <div className='widgets'>
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      { news.length === 0 ?  (<Box sx={{ width: '100%' }}>
      <LinearProgress/>
    </Box> ): news }
    {/* <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>  */}


    </div>
  );
};

export default Widgets