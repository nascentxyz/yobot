#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# Deploy.
YobotBrokerAddr=$(deploy YobotArtBlocksBroker)
log "YobotArtBlocksBroker deployed at:" $YobotBrokerAddr