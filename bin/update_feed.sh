#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

curl -sS http://djrobit.com/podcast/feed.xml | pickup > $DIR/../app/podcast/feed.json