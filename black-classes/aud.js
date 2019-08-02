import * as r from '../black-readers.js'

export default function(map)
{
    map.set("AudEventKey", new Map([
        ["value", r.ushort],
        ["time", r.float]
    ]))

    map.set("AudEventCurve", new Map([
        ["name", r.string],
        ["keys", r.array],
        ["sourceTriObserver", r.object]
    ]))
}