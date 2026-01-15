local androidproj = {}

local bridge = {
    call = nil,        -- function injected from Android to execute JS
    callbacks = {}     -- async callback table
}

-- Register Android bridge functions
function androidproj.SetBridge(androidFunctions)
    bridge.call = androidFunctions.callJS
    bridge.callLua = androidFunctions.callLua
end

-- Execute JavaScript (async)
function androidproj.ExecuteJS(code, callbackId)
    if not bridge.call then
        return false, "Bridge not attached"
    end

    -- send code to Android side
    bridge.call(code, callbackId)
end

-- Show alert via JS
function androidproj.Alert(title, text, type)
    local js = string.format(
        "window.AndroidAlert('%s','%s','%s')",
        title, text, type or "info"
    )
    bridge.call(js)
end

-- Receive messages from Android → JS → Lua
function androidproj.OnMessage(id, data)
    if bridge.callbacks[id] then
        bridge.callbacks[id](data)
        bridge.callbacks[id] = nil
    end
end

-- Register async callback
function androidproj.RegisterCallback(id, fn)
    bridge.callbacks[id] = fn
end

return androidproj
