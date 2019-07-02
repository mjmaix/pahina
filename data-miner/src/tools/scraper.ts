import $ from "cheerio";
import rp from "request-promise";

export const extractLinks: (
  url: string,
  selector: string
) => Promise<string[]> = async (url, selector) => {
  const html = await rp(url);

  const urls = [];
  const links = $(selector, html);
  for (let i = 0; i < links.length; i++) {
    urls.push(links[i].attribs.href);
  }
  return urls;
};

interface ValueLink {
  text: string;
  link: string;
}

export const extractAValueLink: (
  url: string,
  selector: string
) => Promise<ValueLink[]> = async (url, selector) => {
  const html = await rp(url);

  const urls: ValueLink[] = [];
  const links = $(selector, html);
  for (let i = 0; i < links.length; i++) {
    urls.push({ text: $(links[i]).text(), link: links[i].attribs.href });
  }
  return urls;
};
