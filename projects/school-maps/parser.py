import csv
import json


files = ['physics.txt', 'calculus.txt']  # 'algebra.txt', 'chemistry.txt']

school_dict = {}

for f in files:
    subject = f.replace('.txt', '')

    with open(f, 'rb') as infile:
        reader = csv.reader(infile, delimiter='\t')
        for row in reader:
            school_id = row[0]
            dist = row[1]
            school = row[2]
            total = row[3]
            white = row[4]
            hispanic = row[5]
            indian = row[6]
            black = row[7]
            asian = row[8]
            hawpi = row[9]
            two_more = row[10]
            male = row[11]
            female = row[12]
            limited_prof = row[13]
            lat = row[14]
            lng = row[15]

            # see if record exists
            rec = school_dict.get(school_id, None)

            # record doesn't exist
            if not rec:
                school_dict[school_id] = {
                    'dist': dist,
                    'school': school,
                    'lat': lat,
                    'lng': lng
                }

            school_dict[school_id][subject] = {
                'total': total,
                'white': white,
                'hispanic': hispanic,
                'indian': indian,
                'black': black,
                'hawpi': hawpi,
                'asian': asian,
                'two_more': two_more,
                'male': male,
                'female': female,
                'limited_prof': limited_prof
            }

with open('data.json', 'wb') as outfile:
    outfile.write(json.dumps(school_dict, separators=(',',':')))
