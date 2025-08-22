interface Quote {
  text: string;
  author: string;
  image: string;
}
// Collection of inspirational quotes
const quotes: Quote[] = [{
  text: 'The only way to do great work is to love what you do.',
  author: 'Steve Jobs',
  image: 'https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=1200&auto=format&fit=crop'
}, {
  text: "Life is what happens when you're busy making other plans.",
  author: 'John Lennon',
  image: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?q=80&w=1200&auto=format&fit=crop'
}, {
  text: 'The future belongs to those who believe in the beauty of their dreams.',
  author: 'Eleanor Roosevelt',
  image: 'https://images.unsplash.com/photo-1499566727020-881da110a0b0?q=80&w=1200&auto=format&fit=crop'
}, {
  text: 'In the middle of difficulty lies opportunity.',
  author: 'Albert Einstein',
  image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200&auto=format&fit=crop'
}, {
  text: 'It does not matter how slowly you go as long as you do not stop.',
  author: 'Confucius',
  image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1200&auto=format&fit=crop'
}, {
  text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
  author: 'Winston Churchill',
  image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1200&auto=format&fit=crop'
}, {
  text: 'The best time to plant a tree was 20 years ago. The second best time is now.',
  author: 'Chinese Proverb',
  image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop'
}, {
  text: "You miss 100% of the shots you don't take.",
  author: 'Wayne Gretzky',
  image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1200&auto=format&fit=crop'
}, {
  text: "Whether you think you can or you think you can't, you're right.",
  author: 'Henry Ford',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop'
}, {
  text: 'The only limit to our realization of tomorrow will be our doubts of today.',
  author: 'Franklin D. Roosevelt',
  image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1200&auto=format&fit=crop'
}, {
  text: "Believe you can and you're halfway there.",
  author: 'Theodore Roosevelt',
  image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop'
}, {
  text: "Everything you've ever wanted is on the other side of fear.",
  author: 'George Addair',
  image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1200&auto=format&fit=crop'
}];
// Get a random quote
const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
// In a real app, this would check the date and return the same quote for the whole day
export const getQuoteOfTheDay = (): Quote => {
  // For demonstration purposes, we're just returning a random quote
  // In a production app, you would use the current date to seed the random selection
  // so the same quote appears all day
  return getRandomQuote();
};