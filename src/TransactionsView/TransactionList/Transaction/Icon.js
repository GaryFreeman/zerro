import React from 'react'
import styled from 'styled-components'
import toArray from 'lodash/toArray'

const IconWrap = styled.div`
  grid-area: icon;
  margin-top: -8px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: #000;
  line-height: 40px;
  text-align: center;
  font-size: 24px;
`

function getFirstSymbol(str) {
  return toArray(str)[0]
}
function isEmoji(str) {
  const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
  return str.match(regex)
}
function startsWithEmoji(str) {
  return isEmoji(getFirstSymbol(str))
}
function renderIcon(tags, type) {
  const mainTag = tags ? tags[0] : null
  if (!mainTag && type === 'transfer') {
    return <IconWrap>↔</IconWrap>
  } else if (!mainTag) {
    return <IconWrap />
  }
  return <IconWrap>{getFirstSymbol(mainTag.title)}</IconWrap>
}

export function Icon({ data }) {
  const { tag, type } = data
  return renderIcon(tag, type)
}
