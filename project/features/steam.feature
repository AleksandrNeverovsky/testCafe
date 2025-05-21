Feature: Test steam.

    @steam
    Scenario: Search game in steam.

        Given Steam page is open.

        When Enter game name "The Witcher".
        Then Game name "The Witcher" entered and displayed.

        When Click on search icon.
        Then Search results are displayed.

        When Click on sort button.
        Then Sort dropdown is displayed.

        When Click on 5 sort option.
        # Then Prices sorted in descending order of price.

        And Click on "STORE" menu item button.
        And Click on filter item "By Curators".
        And Return to previous page.
        And Click on filter item "Top Sellers".
        And Click on special offers checkbox.

        Then Checkbox is checked.

    @steam
    Scenario: Search "The Witcher 3: Wild Hunt" game in steam.

        Given Steam page is open.

        When Enter game name "The Witcher 3: Wild Hunt".
        Then Game name "The Witcher 3: Wild Hunt" entered and displayed.

        When Click on search icon.
        Then Search results are displayed.

        When Click on "The Witcher 3: Wild Hunt" search item button.
        And Set as date current date.
        And Click View Page button.
        Then Modal with text "Please enter a valid date" displayed.

        When Click on OK button.
        And Set as date "21 May 1993".
        And Click View Page button.
        Then Game Page is opened.
        And Game Page for "The Witcher 3: Wild Hunt".
        And Publisher sale image is displayed.

        # Search for the "The Witcher 3: Wild Hunt"
        # Open game page
        # Set as date current date and click View Page
        # "Please enter a valid date" displayed
        # Enter valid date
        # Game Page is opened
        # Publisher sale image is displayed
        # Image contains text "Celebrating the 10th Anniversary of The Witcher 3: Wild Hunt" 

