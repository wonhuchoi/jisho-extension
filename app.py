from jisho_api.word import Word
r = Word.request('water')
# print(r)
from jisho_api.kanji import Kanji
r = Kanji.request('水')
# print(r)
from jisho_api.sentence import Sentence
r = Sentence.request('水')
# print(r)
from jisho_api.tokenize import Tokens
r = Tokens.request('昨日すき焼きを食べました')
print(r)