import allWordList from '../data/words.json';
import wordList from '../data/words-1.json';

// const RANDOM_WORD_API = 'https://random-word-api.herokuapp.com/word';
const DATAMUSE_API = 'https://api.datamuse.com/words';
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

type DatamuseWord = {
  word: string;
  score: number;
  tags: string[];
};

export type WordData = {
  word: string;
  category?: string;
  definition?: string;
  similarWords?: string;
  hint?: string;
};

const getFallbackWord = (): WordData => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};

const getWordDefinition = async (word: string): Promise<string | null> => {
  try {
    const response = await fetch(`${DICTIONARY_API}/${word}`);
    if (!response.ok) return null;
    
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      let definition = data[0].meanings?.[0]?.definitions?.[0]?.definition || null;
      if (definition && definition.length > 100) {
        definition = definition.substring(0, 123) + "...";
      }
      return definition;
    }
  } catch (error) {
    console.error('Error fetching definition:', error);
    return null;
  }
};

export const getRandomWord = async (): Promise<WordData> => {
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      const length = Math.floor(Math.random() * 5) + 4;
      // const response = await fetch(`${RANDOM_WORD_API}?lang=en&length=${length}&number=1`);
      
      // Filter words of the desired length from allWordList
      const wordsOfLength = allWordList.filter(word => word.length === length);
      if (wordsOfLength.length === 0) {
      // if (!response.ok) {
        attempts++;
        continue;
      }
      
      
      // const [randomWord] = await response.json();
      
      // if (!randomWord || randomWord.length < 4) {
      //   attempts++;
      //   continue;
      // }

      const randomWord = wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
      
      const definition = await getWordDefinition(randomWord);
      if (!definition) {
        attempts++;
        continue;
      }
      
      let similarWords: DatamuseWord[] = [];
      try {
        const similarWordsResponse = await fetch(`${DATAMUSE_API}?ml=${randomWord}&max=2`);
        if (similarWordsResponse.ok) {
          similarWords = await similarWordsResponse.json();
        }
      } catch (error) {
        console.error('Error fetching similar words:', error);
      }
      
      return {
        word: randomWord.toUpperCase(),
        category: '',
        definition: definition || '',
        similarWords: similarWords.length > 0
          ? similarWords.map(w => w.word.charAt(0).toUpperCase() + w.word.slice(1)).join(', ')
          : '',
        hint: ''
      };
    } catch (error) {
      console.error('Error in getRandomWord:', error);
      attempts++;
    }
  }

  return getFallbackWord();
};

export const calculateScore = (
  wordLength: number,
  timeTaken: number,
  streakCount: number
) => {
  const timeTakenPoints = timeTaken > 120 ? 0 : 120 - timeTaken;
  return wordLength * 10 + timeTakenPoints + streakCount + 5;
};

export const getHintLettersCount = (wordLength: number): number => {
  const savedDifficulty = localStorage.getItem("hangmanDifficulty") || "medium";
  if (savedDifficulty === "easy") {
    return wordLength % 2 !== 0 ? Math.ceil((wordLength - 1) / 2) : Math.floor((wordLength - 1) / 2) + 1;
  } else if (savedDifficulty === "medium") {
    return wordLength % 2 !== 0 ? Math.ceil((wordLength - 1) / 2) : Math.floor((wordLength - 1) / 2);
  } else {
    return wordLength % 2 !== 0 ? Math.ceil((wordLength - 1) / 2) : Math.floor((wordLength - 1) / 2) - 1;
  }
};

export const getRandomPositions = (wordLength: number, count: number): number[] => {
  const positions: number[] = [];
  while (positions.length < count) {
    const pos = Math.floor(Math.random() * wordLength);
    if (!positions.includes(pos)) {
      positions.push(pos);
    }
  }
  
  return positions;
};
