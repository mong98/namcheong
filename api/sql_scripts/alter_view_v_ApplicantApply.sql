USE [JobPortal]
GO

/****** Object:  View [dbo].[v_ApplicantApply]    Script Date: 8/1/2021 9:31:30 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[v_ApplicantApply]
AS
SELECT        dbo.ApplicantApply.Id, dbo.ApplicantApply.Position AS ApplyPosition, dbo.ApplicantApply.PositionID AS ApplyPositionID, 
                         dbo.ApplicantApply.DtApplication AS ApplyDtApplication, ConfirmFlag AS ApplyConfirmFlag, SubmitFlag AS SubmitFlag, FileAFE, FileCV, FileSEA, 
                         dbo.ApplicantApply.LoginEmail AS ApplyLoginEmail, dbo.ApplicantApply.Status AS ApplyStatus, dbo.Applicant.Position, dbo.Applicant.DtApplication, 
                         dbo.Applicant.LoginEmail, dbo.Applicant.Password, dbo.Applicant.Name, dbo.Applicant.MiddleName, dbo.Applicant.LastName, dbo.Applicant.Gender, dbo.Applicant.IC, dbo.Applicant.Passport, dbo.Applicant.ValidityDate, 
                         dbo.Applicant.DOB, dbo.Applicant.PlaceofBirth, dbo.Applicant.CountryOfOrigin, dbo.Applicant.MaritalStatus, dbo.Applicant.Nationality, dbo.Applicant.NationalityOthers, 
                         dbo.Applicant.Race, dbo.Applicant.Raceothers, dbo.Applicant.Religion, dbo.Applicant.Religionothers, dbo.Applicant.PermanentAddress, dbo.Applicant.PPostCode, 
                         dbo.Applicant.PState, dbo.Applicant.PStateOthers, dbo.Applicant.Residentialaddress, dbo.Applicant.RPostCode, dbo.Applicant.RState, dbo.Applicant.RStateOthers, dbo.Applicant.Contact_MobileCtryCode, 
                         dbo.Applicant.Contact_MobileAreaCode, dbo.Applicant.Contact_Mobile, dbo.Applicant.Contact_HouseCtryCode, dbo.Applicant.Contact_HouseAreaCode, 
                         dbo.Applicant.Contact_House, dbo.Applicant.RepatriationHomePort, dbo.Applicant.NOKName, dbo.Applicant.NOKRelationship, dbo.Applicant.NOKOccupaction, 
                         dbo.Applicant.NOKAge, dbo.Applicant.EmergencyContactName, dbo.Applicant.EmergencyContactRelationship, dbo.Applicant.EmergencyContact_MobileCtryCode, 
                         dbo.Applicant.EmergencyContact_MobileAreaCode, dbo.Applicant.EmergencyContact_Mobile, dbo.Applicant.EmergencyContact_HouseCtryCode, 
                         dbo.Applicant.EmergencyContact_HouseAreaCode, dbo.Applicant.EmergencyContact_House, dbo.Applicant.IncomeTaxNo, dbo.Applicant.SeamanCardNo, 
                         dbo.Applicant.SeamanCard_DtIssue, dbo.Applicant.SeamanCard_DtExpiry, dbo.Applicant.SeamanBookNo, dbo.Applicant.SeamanBook_DtIssue, 
                         dbo.Applicant.SeamanBook_DtExpiry, dbo.Applicant.COCNo, dbo.Applicant.COC_DtIssue, dbo.Applicant.COC_DtExpiry, dbo.Applicant.CORNo, 
                         dbo.Applicant.COR_DtIssue, dbo.Applicant.COR_DtExpiry, dbo.Applicant.SignatureBy1, dbo.Applicant.SignDt1, dbo.Applicant.SignatureBy2, dbo.Applicant.SignDt2, 
                         dbo.Applicant.DtCreated, dbo.Applicant.DtUpdated, dbo.Applicant.ForgotPasswordFlag, dbo.Applicant.ForgotPasswordCode, dbo.Applicant.ForgotPasswordDtExpiry, 
                         dbo.Applicant.Status, dbo.ApplicantApply.OfferPosition, dbo.ApplicantApply.DailyRate, dbo.ApplicantApply.StandbyRate, dbo.ApplicantApply.Allowance, 
                         dbo.ApplicantApply.TypesofAllowance, dbo.ApplicantApply.ContractPeriodFromInMth, dbo.ApplicantApply.ContractPeriodFrom, dbo.ApplicantApply.ContractPeriodTo, 
                         dbo.ApplicantApply.NameofVessel, dbo.ApplicantApply.IMONo, dbo.ApplicantApply.PortofRegistry, iif(dbo.ApplicantApply.Status = 'New' AND datediff(day, 
                         dbo.ApplicantApply.DtApplication, getdate()) > 7, 'Review', dbo.ApplicantApply.Status) AS ApplyStatus2, dbo.Applicant.FileName, dbo.Applicant.FilePath, 
                         dbo.Applicant.FileNameCV, dbo.Applicant.FilePathCV, ConfirmNo, ConfirmBy, ConfirmByName, SerialNumber, ConfirmDt, Ref1Name, Ref1Company, Ref1Designation, 
                         Ref1Contact, Ref2Name, Ref2Company, Ref2Designation, Ref2Contact, GenDoc, ConfirmFlag, dbo.ApplicantApply.FileAFECreateDt, 
                         dbo.ApplicantApply.FileCVCreateDt, dbo.ApplicantApply.FileSEACreateDt, dbo.ApplicantApply.FileAFEEndDt, dbo.ApplicantApply.FileCVEndDt, 
                         dbo.ApplicantApply.FileSEAEndDt
FROM            dbo.ApplicantApply LEFT OUTER JOIN
                         dbo.Applicant ON dbo.ApplicantApply.LoginEmail = dbo.Applicant.LoginEmail

GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 114
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Wi' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'v_ApplicantApply'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'dth = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'v_ApplicantApply'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'v_ApplicantApply'
GO


