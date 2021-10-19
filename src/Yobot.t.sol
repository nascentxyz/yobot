pragma solidity ^0.8.6;

import "ds-test/test.sol";

import "./Yobot.sol";

contract YobotTest is DSTest {
    Yobot yobot;

    function setUp() public {
        yobot = new Yobot();
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
