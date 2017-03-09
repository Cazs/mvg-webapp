<script>
    function showTab(tab_id)
    {
      window.parent.document.querySelectorAll('.mvg-tab-pane').forEach(function(div_obj)
      {
        div_obj.classList.remove('mvg-pane-active');
        if(window.parent.document.querySelector('#'+tab_id))
          window.parent.document.querySelector('#'+tab_id).classList.add('mvg-pane-active');
      });
    }
  </script>
