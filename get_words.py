import json
from bs4 import BeautifulSoup
from urllib import request

PATH = 'wordList.js'
BASE_URL = 'http://www.graduateshotline.com/gre/load.php?file=list{}.html'


def get_rows():
    data = []
    for i in range(1, 6):
        html = request.urlopen(BASE_URL.format(i)).read()
        soup = BeautifulSoup(html)
        rows = soup.find_all('tr')
        for row in rows:
            word_td, definition_td = row.find_all('td')
            word = word_td.text
            example_url = word_td.find('a')['href']
            definition = definition_td.text
            data.append({'word': word.lower(), 'usage_url': example_url, 'definition': definition})

    return data


# def get_definition(url):
#     html = request.urlopen(url).read()
#     soup = BeautifulSoup(html)
#     td = soup.find('td')
#     for el in td.find_all('a') + list(td.find('h2')):
#         el.extract()
#     return td.text


def to_file(data, path=PATH):
    with open(path, 'w') as f:
        f.write("WORD_LIST = {};".format(json.dumps(data, indent=2, sort_keys=True)))


if __name__ == '__main__':
    data = get_rows()
    # print(get_definition(data[0]['usage_url']))
    to_file(data)
