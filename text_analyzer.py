from langdetect import detect
from typing import Dict, List, Tuple
import re

class TextAnalyzer:
    def __init__(self):
        # Predefined terms for both languages
        self.tagalog_terms = {
            'offensive': [
                'bobo', 'tanga', 'gago', 'ulol', 'inutil',
                'tarantado', 'engot', 'ungas', 'baliw', 'abnormal',
                'tae', 'bwisit', 'loko', 'sira ulo', 'hangal',
                'gunggong', 'timang', 'hinayupak', 'hayop', 'demonyo'
            ],
            'sensitive': [
                'patay', 'dugo', 'sakit', 'sugat', 'aksidente',
                'kamatayan', 'disgrasya', 'trahedya', 'sakuna', 'krimen',
                'nakaw', 'holdap', 'barilan', 'saksak', 'away'
            ],
            'profanity': [
                'putang ina', 'putangina', 'puta', 'pakyu', 'leche',
                'kupal', 'tangina', 'gago', 'tarantado', 'ulol',
                'punyeta', 'pesteng yawa', 'yawa', 'hindot', 'bwisit'
            ]
        }
        
        self.english_terms = {
            'offensive': [
                'stupid', 'idiot', 'dumb', 'moron', 'fool',
                'imbecile', 'dimwit', 'numbskull', 'dunce', 'nitwit',
                'halfwit', 'bonehead', 'ignorant', 'mindless', 'brainless'
            ],
            'sensitive': [
                'death', 'blood', 'injury', 'wound', 'accident',
                'tragedy', 'disaster', 'catastrophe', 'crime', 'murder',
                'theft', 'robbery', 'shooting', 'stabbing', 'fight'
            ],
            'profanity': [
                'damn', 'hell', 'ass', 'bastard', 'shit',
                'fuck', 'bitch', 'crap', 'piss', 'dick',
                'asshole', 'motherfucker', 'bullshit', 'cunt', 'whore'
            ]
        }

    def detect_language(self, text: str) -> str:
        """
        Detect if the text is in Tagalog or English
        Returns: 'tl' for Tagalog, 'en' for English
        """
        try:
            lang = detect(text)
            return 'tl' if lang == 'tl' else 'en'
        except:
            # Default to English if detection fails
            return 'en'

    def get_term_context(self, text: str, term: str, window: int = 5) -> str:
        """
        Extract context around the flagged term
        window: number of words before and after the term to include
        """
        words = text.split()
        try:
            term_position = -1
            # Find the position of the term (might be multiple words)
            term_words = term.split()
            for i in range(len(words) - len(term_words) + 1):
                if words[i:i + len(term_words)] == term_words:
                    term_position = i
                    break

            if term_position == -1:
                return ""

            start = max(0, term_position - window)
            end = min(len(words), term_position + len(term_words) + window)
            
            return " ".join(words[start:end])
        except:
            return text

    def analyze_text(self, text: str) -> List[Dict]:
        """
        Analyze text and return flagged terms with their context and category
        """
        results = []
        language = self.detect_language(text.lower())
        terms_to_check = self.tagalog_terms if language == 'tl' else self.english_terms

        # Check each category and its terms
        for category, terms in terms_to_check.items():
            for term in terms:
                if term.lower() in text.lower():
                    context = self.get_term_context(text, term)
                    results.append({
                        'term': term,
                        'category': category,
                        'language': 'Tagalog' if language == 'tl' else 'English',
                        'context': context
                    })
                    print(f"[FLAGGED] {category.upper()} term detected: '{term}'")
                    print(f"Language: {language}")
                    print(f"Context: {context}")
                    print("-" * 50)

        return results

# Example usage
if __name__ == "__main__":
    analyzer = TextAnalyzer()
    
    # Test cases
    test_texts = [
        "You are such an idiot for doing that!",
        "Ang bobo mo naman, hindi mo ba naiintindihan?",
        "There was a tragic accident on the highway yesterday.",
        "May nakita akong aksidente sa kalsada kanina.",
        "What the hell is wrong with you?",
        "Putang ina mo, ano ba problema mo?"
    ]

    print("Starting text analysis...\n")
    for text in test_texts:
        print(f"\nAnalyzing text: '{text}'")
        results = analyzer.analyze_text(text)
        print("=" * 70) 