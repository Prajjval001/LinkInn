import React from 'react';
import './Widgets.css';
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className='widgets__article'>
           <div className="widgets__articleleft">
            <FiberManualRecordIcon />
            </div> 

           <div className="widgets__articleright">
            <h4>{heading}</h4>
            <p>{subtitle}</p>
           </div> 

        </div>
    )

  return (
    <div className='widgets'>
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle('Tech Developer is in league', 'Top news - 7456 reader')}
      {newsArticle( 'MOONlighting: Company Employees Update', 'Top news -6530 readers')}
      {newsArticle('North Korea’s crypto-nukes & this weeks top tech story', 'Top news - 456 reader')}
      {newsArticle( 'Bitcoin miners under pressure as the network’s mining difficulty hits all-time high', 'Top news -530 readers')}
      {newsArticle('Google is hiring software developers', 'Top news - 9025 reader')}
      {newsArticle( 'Apple Confirms i-Phone15 X-Pro-Max', 'Top news -730 readers')}
    </div>
  );
};

export default Widgets