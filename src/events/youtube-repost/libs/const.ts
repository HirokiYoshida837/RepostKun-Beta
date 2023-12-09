const checkStrings = [
  'https://www.youtube.com/',
  'https://youtube.com/',
  'https://youtube.com/',
  'https://youtu.be/'
]


export const CheckContentContainsTargetWord  = (content: string):boolean =>  {

  if (checkStrings.find(x => content.includes(x))) {
    console.debug(`this content contains repost target word.`)
    return true
  } else {
    console.debug(`don't need to repost.`)
    return false
  }
}
