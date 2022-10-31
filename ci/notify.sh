#!/usr/bin/env bash

export VERSION="${CI_COMMIT_BRANCH}-${CI_COMMIT_SHORT_SHA}"
SLACK_USERNAME="amir_platform_ui"
SLACK_EMOJI=":amir_platform_ui:"
SLACK_CHANNEL="#amir-platform-ui"
slack_notif() {
    token="${1}"
    if [[ $token ]]; then
        message="New Deployment of amir-platform ui Version: ${VERSION}"
        endpoint="https://hooks.slack.com/services/${token}"
        payload="{\"text\": \"${message}\", \"username\": \"${SLACK_USERNAME}\", \"channel\": \"${SLACK_CHANNEL}\", \"icon_emoji\": \"${SLACK_EMOJI}\"}"
        curl -X POST "${endpoint}" -H "Accept: application/json" -d "${payload}"
    fi
}

slack_notif "${SLACK_TOKEN}"
