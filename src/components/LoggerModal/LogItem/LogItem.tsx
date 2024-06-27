import React from 'react'
import { ILogItem } from '../../../types'
import { BsFillPersonFill } from 'react-icons/bs'
import { author, date, logItemWrap, message } from './LogItem.css'

interface LogItemProps {
  logItem : ILogItem
}

const LogItem : React.FC<LogItemProps> = ({logItem}) => {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimeStamp));

  const showOffsetTime = `
    ${ timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ""}
    ${ timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}s ago` : ""}
    ${ timeOffset.getSeconds()=== 0 ? `just now` : ""}
  `;

  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={message}>{logItem.logMessage}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  )
}

export default LogItem