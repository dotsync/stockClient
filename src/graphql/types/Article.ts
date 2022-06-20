export interface Article {
        title: String;
        tickers: String[];
        publisher: Publisher;
        amp_url: String;
        article_url: String;
        author: String;
        description: String;
        id: String;
        image_url: String;
        keywords: String;
        published_utc: String;
}

interface Publisher {
        favicon_url: String;
        homepage_url: String;
        logo_url: String;
        name: String;
}

