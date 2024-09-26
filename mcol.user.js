// ==UserScript==
// @name         Middle Click to Open Link
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Allow middle-clicking on selected text to open it as a link in a new tab.
// @author       Ryno9341
// @match        *://*/*
// @grant        none
// @homepageURL  https://github.com/ryno9341/mcol
// @supportURL   https://github.com/ryno9341/mcol/issues
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Listens for mouseup events to detect middle-clicks and opens valid URLs.
     * @event mouseup
     * @param {MouseEvent} event - The mouse event triggered on mouseup.
     * @example
     * // Click that magic middle mouse button and watch the link fly!
     */
    document.addEventListener('mouseup', function(event) {
        // Check if the middle mouse button was clicked
        if (event.button === 1) {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();

            // Validate the selected text as a link
            if (isValidURL(selectedText)) {
                // Open the link in a new tab
                window.open(selectedText, '_blank');
                // Prevent the default middle-click scrolling
                event.preventDefault();
            }
        }
    });

    /**
     * Listens for mousedown events to allow scrolling if no text is selected.
     * @event mousedown
     * @param {MouseEvent} event - The mouse event triggered on mousedown.
     * @example
     * // Scroll away, my friend! Just not over selected text, please.
     */
    document.addEventListener('mousedown', function(event) {
        if (event.button === 1) {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();

            // If no text is selected, allow default behavior (scrolling)
            // Because who doesn’t love a good scroll, am I right?
            if (!selectedText) {
                return; // Do nothing, allow scrolling
            }

            // If we let this happen, we might end up in a rabbit hole of scrolls!
            // Otherwise, prevent default behavior
            event.preventDefault();
        }
    });

    /**
     * Validates if a string is a valid URL using a regex pattern.
     * @param {string} string - The string to validate.
     * @returns {boolean} True if the string is a valid URL; otherwise, false.
     * @example
     * // Is this a URL? Let's find out before we accidentally send someone to the moon!
     */
    function isValidURL(string) {
        // Basic regex to check for valid URLs
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
            'localhost|' + // localhost
            '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // OR ip (v4) address
            '\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\]?)' + // OR ipv6
            '(\\:\\d+)?(\\/[^\\s]*)?$', 'i'); // path (allow anything until whitespace)

        // Time to shine, my regex friend! Check if the string holds up to URL standards.
        return urlPattern.test(string);
    }
})();
