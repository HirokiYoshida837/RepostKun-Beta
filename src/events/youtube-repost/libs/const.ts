const checkStrings: readonly string[]= [
  'https://www.youtube.com/',
  'https://youtube.com/',
  'https://youtube.com/',
  'https://youtu.be/'
]

export const CheckContentContainsTargetWord  = (content: string):boolean =>  {

  return !!checkStrings.find(x => content.includes(x));
}
