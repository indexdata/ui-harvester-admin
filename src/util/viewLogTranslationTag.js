function viewLogTranslationTag(rec) {
  return `ui-harvester-admin.button.view-log.${rec.currentStatus === 'RUNNING' ? 'current' : 'last'}`;
}

export default viewLogTranslationTag;
