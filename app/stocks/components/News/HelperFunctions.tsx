
/**
 *  Henter alle artiklene fra Articles useState, sjekker datoene på alle artiklene og returnerer artikler med riktig dato
 */



export const filterNewsBasedOnDate = (articles: any[], clickedDate: string) => {

    const test1 = parseArticleDate(articles[0].date);
    console.log("articles[2].date: ", test1);
    console.log("clickedDate", clickedDate);

    return articles.filter((article: any) => parseArticleDate(article.date) === clickedDate)
}


  // **Konverter artikkeldato til riktig format**
export const parseArticleDate = (dateStr: string) => {
    const match = dateStr.match(/(\d{4})(\d{2})(\d{2})T/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
};



export const formatDate = (dateString: string) => {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1;  // Må trekke fra 1 fordi JavaScript-måneder starter fra 0
    const day = parseInt(dateString.substring(6, 8), 10);


    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const formattedDate = `${day} ${months[month]} ${year}`;
    
    return formattedDate; // Format: YYYY MM DD
};


// Check if a date is weekend
export const adjustToNearestFriday = (CurrentDate: string) => {

    if (CurrentDate == null) {
      return;
    }
  
    const date = new Date(CurrentDate);
    const dayOfWeek = date.getDay();
  
    // Hvis det er lørdag
    if (dayOfWeek === 6) {
        date.setDate(date.getDate() - 1);
    }
  
    if (dayOfWeek === 0) {
        date.setDate(date.getDate() - 2);
    }
  
    return date.toISOString().split("T")[0];
} 