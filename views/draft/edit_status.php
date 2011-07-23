<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<?php require('meta.php'); ?>
	</head>
	<body>
	<div id="page_wrapper">
		<?php require('header.php');
		require('comm_draft_menu.php'); ?>
		<div id="content">
		<form action="comm_edit_draft_status.php" method="POST">
			<input type="hidden" name="draft_id" value="<?php echo DRAFT_ID;?>" />
			<fieldset>
			<legend>Change Draft Status</legend>
			<p><label for="team_name">Draft Status*:</label>
			<select name="draft_status" id="draft_status">
				<option value="undrafted"<?php if($DRAFT->isUndrafted()) { echo " selected=\"selected\""; } ?>>Undrafted</option>
				<option value="in_progress"<?php if($DRAFT->isInProgress()) { echo " selected=\"selected\""; } ?>>In Progress</option>
			</select>
			</p>
			<p id="info" class="error">NOTE: If you switch from "In Progress" to "Undrafted" and have already started to draft, you <em>will</em> lose any and all progress in draft picks.<br />Are you sure?</p>
			<p><input type="submit" name="submit" id="submit" class="button" value="Change Draft Status" /></p>
			<?php if(count($ERRORS) > 0) {?>
				<?php foreach($ERRORS as $error) {?>
					<p class="error">* <?php echo $error;?></p>
				<?php }?>
			<?php } else {?>
				<p class="error">*Required</p>
			<?php }?>
			</fieldset>
		</form>
		</div>
		<?php require('footer.php'); ?>
	</div>
	</body>
</html>