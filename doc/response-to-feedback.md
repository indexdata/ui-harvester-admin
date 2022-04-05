# UI modifications arising from screenshot analysis

GBV comments on the screenshots that I supplied on 15 March are at
https://drive.google.com/file/d/1_PYsNa20k0vmAD09GD2iAuO7D3aaBLHV/view
and a video of the accompanying presentation is at
https://drive.google.com/file/d/1V7s0ApLVZe-AxQoEy5WTjDaf3YElZlWW/view

These are helpful, and I will be able to make some progress based on them, but I think it's becoming clear that we need to get GBV a system that they can play with soonest. @charlotte, do you have a sense of where we are with that?

Specific points arising from the document and the presentation:
* All the top-level tabs -- Harvest jobs / Storage engines / Transformation pipelines / Transformation steps -- do in fact exist on all pages. The screenshots I sent you a while back predated that fix.
* I could use a little more guidance on how to format the long status text. @nielserik, do you think the `message` field is formatted reliably enough that I can parse out the numbers and present them differently? Or is the best we can really do just to dump the message out blindly?
* It seems I will not be able to provide a link to the logfile at least for now. @nielserik, is it realistic to provide a new mod-harvester-admin WSAPI for this?
* Thank you for the revised ordering of fields in the search results (name, status, date/time of last run, enabled, job class, log, id). It seems that the set of fields to show/hide is _not_ persisted across sessions. That seems like a bug to me. I am investigating.
* For full-record displays, the intent of the "General" section (as Niels-Erik mentioned in the call) is that it contains the fields that are relevant for all the different kinds of harvestable. If in fact some of them are _not_ relevant for XML harvests, then perhaps they are misplaced at present?
* We certainly can break the "General" section down into smaller sections, but I will need guidance of what the new groupings should be. Who can provide that?
* I would like much more detail on which fields should be grouped onto multi-column lines.
* The various list fields, whether comma-separated or space-separated, can be handled on the UI side. @nielserik, there will be no need for mod-harvester-admin changes to support this.
* Finally, the boolean understanding of filters mentioned in the presentation is correct: when Enabled? is set to No, and Current Status is set to New and OK, the search is for `(enabled=no) and (status=new or status=ok)`.

I need to check whether there is a `react-crontab-entry-editor` package or similar.

