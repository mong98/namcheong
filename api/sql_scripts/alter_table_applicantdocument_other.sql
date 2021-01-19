USE [JobPortal]
GO

UPDATE [dbo].[PositionDocument]
      SET [Chk] = 'Y'
      ,[DtIssue] = 'Y'
      ,[DtExpiry] = 'Y'
      ,[DocType] = 'Y'
      ,[DocFile] = 'Y'
      ,[GradeChk] = 'Y'
	    ,[DocNo] = 'Y'
      ,[IssuingAuthorityChk] = 'Y'
 WHERE Chk = 'Y' AND Document IN ('Other 1', 'Other 2', 'Other 3')
GO
