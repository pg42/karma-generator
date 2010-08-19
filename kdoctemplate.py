# -*- coding: utf-8 -*-
k_doc_template = u"""
<!DOCTYPE html>
<html>
<head>
  <title>Lesson Plan for {subject} {title}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <link type="image/ico" rel="icon" href="{karma_dir}/image/favicon.ico" />
  <link type="text/css" rel="stylesheet" href="{karma_dir}/css/karma.css" />
  <link type="text/css" rel="stylesheet" href="{karma_dir}/css/ui.kHeader.css" />
  <link type="text/css" rel="stylesheet" href="{karma_dir}/css/kDoc.css" />
  <script type="text/javascript" src="{karma_dir}/js/external/jquery-1.4.2.js"></script>
  <script type="text/javascript" src="{karma_dir}/js/external/jquery-ui-1.8.2.js"></script>
  <script type="text/javascript" src="{karma_dir}/js/karma.js"></script>
  <script type="text/javascript" src="{karma_dir}/js/ui.kHeader.js"></script>
  <script type="text/javascript" src="{karma_dir}/js/kDoc.js"></script>

</head>
<body id="kDoc">
  <div id="kHeader">
  </div>

  <div id="kHelp" title="Help">
    पाठविवरणर पाठयोजना सहज तरिकाले पढ्न तपाईले निम्न कार्य गर्न सक्नु हुन्छ ।
    <p>
    <div class='zoom zoom-in'></div> थिच्दा  <br />
    अक्षर आकार ठुलो बनाउन सक्नुहुन्छ।
    </p>
    <p>
    <div class='zoom zoom-out'></div> थिच्दा <br />
    अक्षर आकार सानो बनाउन सक्नुहुन्छ।
    </p>
    <br /><br />
    पाठ पृष्टको दाईने तर्फको ठाडो  रेखा तल माथि गर्दा <br />
    तपाईले हाल पढिरहेको पृष्टलाई आवश्यकता अनुसार तल माथि गर्न सक्नुहुन्छ
  </div>

  <iframe id="iframeLessonPlan" src=''>
  </iframe>

</body>
</html>
"""
