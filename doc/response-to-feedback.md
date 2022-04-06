# UI modifications arising from screenshot analysis

GBV comments on the screenshots that I supplied on 15 March are at
https://drive.google.com/file/d/1_PYsNa20k0vmAD09GD2iAuO7D3aaBLHV/view
and a video of the accompanying presentation is at
https://drive.google.com/file/d/1V7s0ApLVZe-AxQoEy5WTjDaf3YElZlWW/view

Based on these, the following TODOs emerge:

* @charlotte: We need to get GBV a system that they can play with soonest.
* @nielserik: I need guidance on how to format the long status text. Is the `message` field is formatted reliably enough that I can parse out the numbers and present them differently? Or is the best we can really do just to dump the message out blindly?
* @nielserik: we need new mod-harvester-admin WSAPI to provide access to the logs, if I am to provide log links in the UK.
* @mike: the set of fields to show/hide is _not_ persisted across sessions. That seems like a bug to me. I am pushing towards fixing this at the stripes-components level, starting with [STCOR-601, "Add facility for persistent storage of user preferences"](https://issues.folio.org/browse/STCOR-601).
* @gbv: The "General" section contains the fields that are relevant for all the different kinds of harvestable. If in fact some of them are _not_ relevant for XML harvests, then perhaps they are misplaced. Which fields fall into that category?
* @gbv: I can break the "General" section down into smaller sections, but I need your guidance on what the new groupings should be.
* @gbv: I would like much more detail on which fields should be grouped onto multi-column lines.
* @mike: the various list fields, whether comma-separated or space-separated, should be handled as lists on the UI side.

What is the best way to edit the crontab entry stored in `scheduleString`? Ideally we would like to find a Node package that provides a crontab-entry editor rather than rolling our own. The only direct contender is
[`react-js-cron`](https://github.com/xrutayisire/react-js-cron),
but that depends on a big (165 Mb) library `antd`. So we may be better off rolling our own using the lower-level parse/render utilities provided by
[`cron-converter`](https://github.com/roccivic/cron-converter).

