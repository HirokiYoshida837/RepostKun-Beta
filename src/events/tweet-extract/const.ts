
// FIXME : regex指定できた方がよさそう
const checkStrings = [
  'https://twitter.com/'
]

export function isTwitterUrl(content: string): boolean {

  if (checkStrings.find(x => content.includes(x))) {
    console.log(`this content contains repost target word.`)
    return true
  } else {
    console.debug(`don't need to repost.`)
    return false
  }
}

export function getOnlyUrlText(fullText: string): string {
  const url = fullText.split(" ").find(x=>x.startsWith('https://'))
  return url ?? ''
}


export function getInfoFromUrl(url:string){

  const userId = getUserId(url)
  const statusId = getStatusId(url)

  return {
    userId,
    statusId
  }



}

const regexes = [
  /https?:\/\/twitter\.com\/(\w+)\/status(es)?\/(\d+)/,
  /https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/,
  /https?:\/\/mobile\.twitter\.com\/(\w+)\/status(es)?\/(\d+)/,
];

const getStatusId = (urlStr: string) => {
  const url = new URL(urlStr);

  if (/(^|\.)twitter.com$/.test(url.host)) {
    return url.pathname.match(/\/status(es)?\/(\d+)/)?.[2];
  }

}

const getUserId = (tweeetUrl: string) => {

  for (const regex of regexes) {
    const match = tweeetUrl.match(regex);
    if (match) {

      return match[1]
    }
  }
}


