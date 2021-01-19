UPDATE [JobPortal].[dbo].[Applicant] 
SET
[FileNameCV] = N'2nd Officer_leeyeefatt@yahoo.com_20181021110635_CV.docx'
WHERE LoginEmail = 'arfahmuh133@gmail.com'

UPDATE [JobPortal].[dbo].[ApplicantApply] 
SET [FileAFE] = N'AFE-00-20181119-01-Radio Operator_yeefatt@msn.com.docx'
, [FileSEA] = N'2nd Officer_leeyeefatt@yahoo.com_20181021110645_SEA.docx'
, [FileCV] = N'2nd Officer_leeyeefatt@yahoo.com_20181021110635_CV.docx'
WHERE Status = 'Offered'

UPDATE [JobPortal].[dbo].[ApplicantApply] 
SET [FileAFE] = N'AFE-00-20181122-01-2nd Engineer_sam.tan@ncl.com.sg.docx'
, [FileSEA] = N'Able Body_sam.tan@ncl.com.sg_20181016102332_SEA.docx'
, [FileCV] = N'Able Body_sam.tan@ncl.com.sg_20181016102324_CV.docx'
WHERE LoginEmail = 'arfahmuh133@gmail.com'


SELECT * FROM [JobPortal].[dbo].[v_ApplicantApply]  WHERE ApplyStatus = 'Offered'
