$(function () {
      // MenuStage.html path for the location of flash interface
      var path = '../../../MenuStage.html';

      $('#backBtn').click(function () { window.location = path; });
      $('#logo').click(function () { $('#logoHelp').toggle(); });
});
