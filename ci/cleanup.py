import requests
from dateutil import parser
import sys

CI_SERVER_URL=sys.argv[1]
GITLAB_TOKEN=sys.argv[2]
CI_PROJECT_ID=sys.argv[3]
GITLAB_REGISTRY_ID=sys.argv[4]


def get_available_registry_tags():
    registry_tags = requests.get(f'{CI_SERVER_URL}/api/v4/projects/{CI_PROJECT_ID}/registry/repositories/{GITLAB_REGISTRY_ID}/tags',
    headers={"PRIVATE-TOKEN":GITLAB_TOKEN})
    return registry_tags.json()

def populate_registry_tags():
    registry_tags = get_available_registry_tags()
    populated_tags = []
    for tag in registry_tags:
        populated_tag_resp = requests.get('{}/api/v4/projects/{}/registry/repositories/{}/tags/{}'.format(CI_SERVER_URL,CI_PROJECT_ID,GITLAB_REGISTRY_ID,tag['name']),
        headers={"PRIVATE-TOKEN":GITLAB_TOKEN})
        populated_tag = populated_tag_resp.json()
        populated_tag['created_at'] =  parser.parse(populated_tag['created_at'])
        populated_tags.append(populated_tag)
    return populated_tags


def sorted_registry_tags():
    tagss = populate_registry_tags()
    tagss.sort(key = lambda x:x['created_at'],reverse=True)
    return [t["name"] for t in tagss]



def delete_more_than_5_tags():
    registry_tagnames = sorted_registry_tags()
    for i in range(len(registry_tagnames)):
        if(i>4):
            print("[INFO] Delete registry tag {}".format(registry_tagnames[i]))
            requests.delete('{}/api/v4/projects/{}/registry/repositories/{}/tags/{}'.format(CI_SERVER_URL,CI_PROJECT_ID,GITLAB_REGISTRY_ID,registry_tagnames[i]),
            headers={"PRIVATE-TOKEN":GITLAB_TOKEN})


delete_more_than_5_tags()