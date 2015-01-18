import collections
import time
from datetime import datetime
import json
import csv

def unicode_csv_reader(unicode_csv_data, dialect=csv.excel, **kwargs):
    # csv.py doesn't do Unicode; encode temporarily as UTF-8:
    csv_reader = csv.reader(utf_8_encoder(unicode_csv_data),
                            dialect=dialect, **kwargs)
    for row in csv_reader:
        # decode UTF-8 back to Unicode, cell by cell:
        yield [unicode(cell, 'utf-8') for cell in row]

def utf_8_encoder(unicode_csv_data):
    for line in unicode_csv_data:
        yield line.encode('utf-8')

# csvfile = unicode_csv_reader(open('test_data.csv'))
with open('test_data.csv', 'rU') as csvfile:
    fp = csv.reader(csvfile, delimiter=',', quotechar='"')

    csvfile.readline()

    topic_dict = {}
    #{label: "FOX", times: [{"starting_time": 1355752800000, "ending_time": 1355759900000, "thumb": "Bowser.gif"}, {"starting_time": 1355767900000, "ending_time": 1355774400000, "thumb": "Bowser.gif"}]},

    for row in fp:
        subject = row[0].replace('Interview/Sony Hack', 'Interview')
        outlet = row[1]
        title = row[2]
        link = row[3]
        date = row[4]
        thumb = row[5]

        topic_dict.setdefault(subject.strip(' '), {}).setdefault(outlet, []).append([title, link, date, thumb])

    formatted_dict = {}

    for x in topic_dict:
        xj_array = []
        for j in topic_dict[x]:
            times_array = []
            for z in topic_dict[x][j]:

                strp_time = time.strptime(z[2], "%m/%d/%y")
                js_date = time.mktime(strp_time)*1000

                spec_data = {"title": z[0], "url": z[1], "thumb": z[3], "starting_time": js_date, "ending_time": js_date+86400000}
                times_array.append(spec_data)
            xj_array.append({'label': j, 'times': times_array })
        formatted_dict.setdefault(x, xj_array)


    to_json=open('data.json','w')
    print>>to_json, json.dumps(formatted_dict)
    to_json.close()
