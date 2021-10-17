/**
 * Small engine to switch screens by hash
 * @version 1.0
 */
class CommanderScreen {

    /**
     * Constructor of CommanderScreen
     * @param {string} startid id of the first screen
     * @param {string} hiddenClass optional class to hide Screen
     * @param {string} activateClass optional extra-class to show screen-Selection
     * @returns 
     */    
    constructor(startid, hiddenClass, activateClass)
    {
        this.hiddenClass = hiddenClass;
        if( !hiddenClass || hiddenClass=="")
        {
            this.hiddenClass = "hidden";
        }
        this.activateClass = activateClass;
        if( !activateClass || activateClass=="")
        {
            this.activateClass = "active";
        }
        this._currentScreen = null;
        this._lastScreen = null;
        this._history = [];
        var controller = this;
        //add listener
        window.addEventListener("hashchange", 
            function(event)
            {
                controller._onHashChange();
            }        
        );
        if( startid )
        {
            this.setScreen( startid );
        }
        else {
            this.setScreen( location.hash.substr(1));
        }
    }

    _onHashChange()
    {
        console.log("Hash", location.hash);
        if( location.hash.length )
        {
            this.setScreen( location.hash.substr(1));
        }
    }

    /**
     * Starts screen with an id
     * @param {string} screenId set a screen with an id
     */
    setScreen( screenId )
    {
        screenId = screenId.replace('#','');
        if( screenId!="")
        {
            var screen = document.getElementById( screenId );
            if( screen )
            {
                if( this._currentScreen )
                {
                    this._lastScreen = this._currentScreen;
                    this._lastScreen.classList.remove( this.activateClass );
                    this._lastScreen.classList.add( this.hiddenClass );
                }
                this._history.push( screenId );
                this._currentScreen = screen;
                this._currentScreen.classList.add( this.activateClass );
                this._currentScreen.classList.remove( this.hiddenClass );
            }
            else {
                console.error(screenId+" is not a valid id. HTML-Element not found.")
            }
        }
    }

    /**
     * returns the current screen-id
     * @returns {string} returns the current id of the screen
     */
    get currentScreen()
    {
        return this._currentScreen;
    }

    /**
     * returns the id of last/previous screen-id
     * @returns {string} returns the id of last/previous screen-id
     */
    get lastScreen()
    {
        return this._lastScreen;
    }

    /**
     * returns a stack of the last screen-ids
     * @returns {Array} returns a stack of the last screen-ids
     */
    get history()
    {
        return this._history;
    }

    /**
     * Initializing CommanderScreen for easy use
     * @param {string} startid id of the first screen
     * @param {string} hiddenClass optional class to hide Screen
     * @param {string} activateClass optional extra-class to show screen-Selection
     * @returns 
     */
    static init(startid, hiddenClass, activateClass)
    {
        return new CommanderScreen(startid, hiddenClass,activateClass);
    }

}