interface XKCDResponse {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
  }
  
  interface GetXKCDResponse {
    data: XKCDResponse;
  }
  
  interface IDResponse {
    id: number;
  }
  
  async function getIDFromEmail(email: string): Promise<number> {
    const response = await fetch(`https://fwd.innopolis.app/api/hw2?email=${email}`);
    const json = await response.json();
    const data = json as IDResponse;
    return data.id;
  }
  
  async function fetchXKCD(id: number): Promise<XKCDResponse> {
    const response = await fetch(`https://getxkcd.vercel.app/api/comic?num=${id}`);
    const json = await response.json();
    const data = json as GetXKCDResponse;
    return data.data;
  }
  
  function parseXKCD(data: XKCDResponse) {
    const img = document.getElementById('comic_img') as HTMLImageElement;
    const p = document.getElementById('comic_title') as HTMLParagraphElement;
    img.src = data.img;
    img.alt = data.alt;
    img.title = data.title;
    const date = new Date(+data.year, +data.month - 1, +data.day);
    const dateStr = date.toLocaleDateString();
    p.innerText = `${data.title}, ${dateStr}`;
  }
  
  async function showXKCD() {
    const email = 'p.baharuev@innopolis.university';
    const id = await getIDFromEmail(email);
    const comicId = document.getElementById('comic_id') as HTMLElement;
    comicId.textContent = `comic_id: ${id}`;
    const data = await fetchXKCD(id);
    parseXKCD(data);
  }
  
  window.onload = showXKCD;